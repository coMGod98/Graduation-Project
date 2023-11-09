package com.looklook.demo.service;

import com.looklook.demo.domain.*;
import com.looklook.demo.dto.*;
import com.looklook.demo.repository.*;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.thymeleaf.util.StringUtils;

import javax.persistence.EntityNotFoundException;
import java.io.File;
import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderService {

    private final ItemRepository itemRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartItemRepository cartItemRepository;
    private final CartRepository cartRepository;
    private final ItemImgRepository itemImgRepository;

    // 주문서 작성 시 필요한 정보 보내주기
    // 주문서 작성 단계에서 주문 상품 테이블에 데이터를 추가 (이때 주문 상태는 false)
    @Transactional
    public OrderSheetResponseDto composeOrderSheet(OrderSheetRequestDto orderSheetRequestDto, Long uid) {

        /*
         * 1. 배송정보 (이름, 연락처, DB에 저장된 사용자 주소)
         * 2. orderItems
         * 3. 결제 금액 (상품 가격, 배송비 포함 총 가격)
         *
         * cf) 위 3가지에 배송정보, 결제 정보(결제 수단, 타입) 업데이트해서 주문할 떄 OrderRequest로 구성하기
         * */

        OrderSheetResponseDto dto = new OrderSheetResponseDto();
        // 1. 배송 정보 가져오기
        Optional<LookLookUser> optionalUser = userRepository.findById(uid);
        if (optionalUser.isPresent()) {
            LookLookUser user = optionalUser.get();
            dto.setUserName(user.getUserName());
            dto.setPhoneNumber(user.getPhoneNumber());
            dto.setAddress(user.getAddress());
        }

        // 2. orderItems
        // 만약 orderSheetRequestDto에 cartId가 null이 아니면, cartItem을 orderItem으로 바꾸기
        // 주문을 완료해야 장바구니가 비워짐. 주문서 작성까지 와도 주문을 완료하지 않으면 cart, cartItem은 유지되어야 함

        if (orderSheetRequestDto.getCartItemIds() != null) { // 장바구니 -> 주문서 작성
            // 1. CartItemId로 장바구니 상품 불러오기
            List<Long> cartItemIds = orderSheetRequestDto.getCartItemIds();

            List<CartItem> cartItems = new ArrayList<>();

            // 주문서 작성이 결제로 이어지지 않을 때, 주문 상품에 중복 저장
            Boolean chkOrderItemConstraint = true;

            for (Long cartItemId : cartItemIds) {
                Optional<CartItem> optionalCartItem = cartItemRepository.findById(cartItemId);
                if (optionalCartItem.isPresent()) {
                    CartItem item = optionalCartItem.get();

                    // 주문서 작성이 결제로 이어지지 않을 때, 주문 상품에 중복 저장 방지
//                    Optional<OrderItem> chkOrderitem = orderItemRepository.findByColorAndCountAndSizeAndItemIdAndOrderIdIsNull(item.getColor(), item.getCount(), item.getSize(), item.getItem().getId());
//                    if (chkOrderitem.isPresent()) {
//                        chkOrderItemConstraint = false;
//                    }
                    cartItems.add(item);
                }
            }

            // 2. CartItem에 있는걸 OrderItem으로
            List<OrderItem> orderItems = cartItems.stream()
                    .map(cartItem -> cartItem.toOrderItem(cartItem))
                    .collect(Collectors.toList());

            List<OrderItemInfoDto> orderItemInfoDtos = new ArrayList<>();

            // 3. OrderItem 테이블에 저장
            for (OrderItem orderItem : orderItems) {
                // 아직 주문 전이므로 orderStatus = INCOMPLETED
                orderItem.setOrderStatus(OrderStatus.INCOMPLETED);


                OrderItem savedDrderItem = orderItemRepository.save(orderItem);

                // OrderInfoDto에 추가해 줄 주문상품 정보 세팅
                OrderItemInfoDto orderItemInfoDto = new OrderItemInfoDto();
                orderItemInfoDto.setOrderItemId(savedDrderItem.getId());
                orderItemInfoDto.setCount(orderItem.getCount());
                orderItemInfoDto.setSize(orderItem.getSize());
                orderItemInfoDto.setColor(orderItem.getColor());

                //
                Optional<Item> optionalItem = itemRepository.findByOrderItems(savedDrderItem);

                if (optionalItem.isPresent()) {
                    orderItemInfoDto.setItemName(optionalItem.get().getItemName());
                    orderItemInfoDto.setPrice(optionalItem.get().getPrice());
                    orderItemInfoDto.setPid(optionalItem.get().getId());
                }

                orderItemInfoDtos.add(orderItemInfoDto);
            }

            // 4. dto에 OrderItem 담아주기
            dto.setOrderiteminfo(orderItemInfoDtos);  // List 형식

            // 5. dto에 orderItemPrice 담아주기
            int orderItemPrice = orderItems.stream().mapToInt(item -> (item.getItem().getPrice())*(item.getCount())).sum();
            dto.setOrderItemPrice(orderItemPrice);

            int totalPrice = orderItemPrice + dto.getSHIPMENT_FEE();
            dto.setTotalPrice(totalPrice);

        } else { // 상품 상세 페이지 -> 주문서 작성
            OrderItem orderItem = new OrderItem();

            List<OrderItemInfoDto> orderItemInfoDtos = new ArrayList<>();
            OrderItemInfoDto orderItemInfoDto = new OrderItemInfoDto();


            // 1. 연관된 item 설정
            Optional<Item> optionalItem = itemRepository.findById(orderSheetRequestDto.getPid());
            if (optionalItem.isPresent()) {
                Item item = optionalItem.get();
                orderItem.setItem(item);
                orderItemInfoDto.setItemName(item.getItemName());
                orderItemInfoDto.setPid(item.getId());
                orderItemInfoDto.setPrice(item.getPrice());
            }

            // 2. size, color, count 설정
            orderItem.setSize(orderSheetRequestDto.getSize());
            orderItem.setColor(orderSheetRequestDto.getColor());
            orderItem.setCount(orderSheetRequestDto.getCount());

            // 3. 아직 주문 전이므로 orderStatus = INCOMPLETED
            orderItem.setOrderStatus(OrderStatus.INCOMPLETED);

            // 4. orderItem 테이블에 저장
            Long id = orderItemRepository.save(orderItem).getId();

            // 5. OrderSheetResponseDto에 orderItem 설정
            // dto에서 List<OrderItem> 타입으로 설정되어 있어서 1개밖에 없어도 리스트에 넣어주기
            List<OrderItem> orderItems = new ArrayList<>();
            orderItems.add(orderItem);

            orderItemInfoDto.setOrderItemId(id);
            orderItemInfoDto.setSize(orderItem.getSize());
            orderItemInfoDto.setCount(orderItem.getCount());
            orderItemInfoDto.setColor(orderItem.getColor());

            orderItemInfoDtos.add(orderItemInfoDto);
            dto.setOrderiteminfo(orderItemInfoDtos);

            // 6. dto에 orderItemPrice 담아주기
            int orderItemPrice = orderItem.getCount() * orderItem.getItem().getPrice();
            dto.setOrderItemPrice(orderItemPrice);

            int totalPrice = orderItemPrice + dto.getSHIPMENT_FEE();
            dto.setTotalPrice(totalPrice);
        }

        return dto;
    }

// 1. orderRequestDto에서 데이터 보내주기
    // 배송정보(새로운 배송지로 업데이트 되었을 수도 있다.), List<Long> orderItemId, 결제 정보 (결제 금액은 서버에서 다시 계산)
// 2. orderRequestDto에서 받은 정보 바탕으로 새로운 Order 생성
// 3. 새로운 Order 설정 끝내면 DB에 저장
// 4. 해당 Order의 모든 OrderItem의 orderStatus가 true로 업데이트
// 5. 장바구니 db 삭제

    @Transactional
    public Long order(OrderRequestDto orderRequestDto, Long uid) {
        Order order = new Order();

        // 회원 정보 불러와서 order 설정
        Optional<LookLookUser> optionalUser = userRepository.findById(uid);

        if (optionalUser.isPresent()) {
            order.setUser(optionalUser.get());
        }

        // 주문 상품 아이디 불러오기
        List<Long> orderItemIds = orderRequestDto.getOrderItemIds();

        // 주문 상품 아이디로 주문 상품 불러와서 리스트 만들기
        List<OrderItem> orderItems = new ArrayList<>();

        for (Long orderItemId : orderItemIds) {
            Optional<OrderItem> optionalOrderItem = orderItemRepository.findById(orderItemId);

            if (optionalOrderItem.isPresent()) {
                OrderItem item = optionalOrderItem.get();
                orderItems.add(item);
            }
        }
        // order에 주문 상품 리스트 설정
        order.setOrderItems(orderItems);

        // 배송지 설정 (dto에 새 배송지 있으면 새 배송지로 설정, 없으면 user 정보에서 가져오기)
        if (orderRequestDto.getNewAddress() != null) {
            order.setAddress(orderRequestDto.getNewAddress());
        } else {
            if (optionalUser.isPresent()) {
                order.setAddress(optionalUser.get().getAddress());
            }
        }
        // 결제 정보 설정
        order.setPaymentMethod(orderRequestDto.getPaymentMethod());
        order.setPaymentType(orderRequestDto.getPaymentType());


        // 결제 금액 설정
        int orderItemPrice = orderItems.stream().mapToInt(item -> (item.getItem().getPrice())*(item.getCount())).sum();

        final int SHIPMENT_FEE = 2500; // 배송비 고정
        int totalPrice = orderItemPrice + SHIPMENT_FEE;
        order.setTotalPrice(totalPrice);


        // 배송 상태 설정 -> 아직 배송 안된 상태이므로 PREPARING
        order.setShipmentStatus(ShipmentStatus.PREPARING);

        // DB에 저장, 배송 일자는 자동으로 설정
        Long orderId = orderRepository.save(order).getId();

        // 해당 Order의 모든 OrderItem의 orderStatus가 true로 업데이트, order_ID도 다시 세팅
        for (OrderItem orderItem : order.getOrderItems()) {
            // 주문 완료 했으므로 주문 상태 정보 업데이트
            orderItem.setOrderStatus(OrderStatus.COMPLETED);
            orderItem.setOrder(order);
            orderItemRepository.save(orderItem);
        }

        // 장바구니 db 삭제
        // 현재는 장바구니에서 선택 구매가 안되기 때문에 그냥 통째로 날려버리면 되는데,
        // 선택 구매가 가능해지면... orderItem과 cartItem이 연결되어있지 않기 때문에.. findByOrderItemItemIdAndSizeAndColor로 찾아서 삭제
        if (optionalUser.isPresent()) {
            Optional<Cart> optionalCart = cartRepository.findByUserId(optionalUser.get().getId());

            if (optionalCart.isPresent()) {
                Optional<List<CartItem>> optionalCartItems = Optional.ofNullable(cartItemRepository.findAllByCartId(optionalCart.get().getId()));

                List<CartItem> cartItems = optionalCartItems.get();
                for (CartItem cartItem : cartItems) {
                    cartItemRepository.deleteById(cartItem.getId());
                }
            }
        }
        return orderId;
    }

    // 주문 정보 조회
    public List<OrderInfoDto> showOrderInfo(Long uid) {
        Optional<LookLookUser> optionalUser = userRepository.findById(uid);
        List<OrderInfoDto> orderInfoDtos = new ArrayList<>();



        // 주문정보와 주문 상품 정보를 하나의 dto로 구성하고, 그걸 리스트로 만들기
        if (optionalUser.isPresent()) {
            List<Order> orders = orderRepository.findAllByUserId(optionalUser.get().getId());
            for (Order order : orders) {
                OrderInfoDto orderInfoDto = new OrderInfoDto();
                orderInfoDto.setOrder(order);

                List<OrderItemInfoDto> orderItemInfoDtos = new ArrayList<>();
                List<OrderItem> orderItems = orderItemRepository.findAllByOrderId(order.getId());
                List<String> mainImgUrl = new ArrayList<>();
                for (OrderItem orderItem : orderItems) {
                    OrderItemInfoDto orderItemInfoDto = new OrderItemInfoDto();

                    orderItemInfoDto.setOrderItemId(orderItem.getId());
                    orderItemInfoDto.setCount(orderItem.getCount());
                    orderItemInfoDto.setSize(orderItem.getSize());
                    orderItemInfoDto.setColor(orderItem.getColor());

                    Optional<Item> optionalItem = itemRepository.findByOrderItems(orderItem);
                    if (optionalItem.isPresent()) {
                        orderItemInfoDto.setItemName(optionalItem.get().getItemName());
                        orderItemInfoDto.setPrice(optionalItem.get().getPrice());
                        orderItemInfoDto.setPid(optionalItem.get().getId());

                        ItemImg main = itemImgRepository.findByItemIdAndRepresent(optionalItem.get().getId(), ImgStatus.main);

                        if (main != null) {
                            String originalPath = main.getFilePath();
                            String extractedPath = originalPath.substring(originalPath.indexOf(File.separator + "img"));
                            mainImgUrl.add(extractedPath);
                        } else {
                            // 해당 상품 이미지가 없을 때 메세지 설정
                            mainImgUrl.add("해당 상품 이미지가 없습니다");
                        }
                    }

                    orderItemInfoDtos.add(orderItemInfoDto);

                }

                for (int i = 0; i < orderItemInfoDtos.size(); i++) {
                    if (i < mainImgUrl.size()) {
                        orderItemInfoDtos.get(i).setMainImgUrl(mainImgUrl.get(i));
                    }
                }
                orderInfoDto.setOrderiteminfo(orderItemInfoDtos);
                orderInfoDtos.add(orderInfoDto);
            }
        }
        return orderInfoDtos;
    }

    public OrderInfoDto orderSuccess(Long orderId) {
        OrderInfoDto orderInfoDto = new OrderInfoDto();
        List<OrderItemInfoDto> orderItemInfoDtos = new ArrayList<>();

        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            orderInfoDto.setOrder(optionalOrder.get());

            List<OrderItem> orderItems = orderItemRepository.findAllByOrderId(optionalOrder.get().getId());
            for (OrderItem orderItem : orderItems) {
                OrderItemInfoDto orderItemInfoDto = new OrderItemInfoDto();

                orderItemInfoDto.setOrderItemId(orderItem.getId());
                orderItemInfoDto.setCount(orderItem.getCount());
                orderItemInfoDto.setSize(orderItem.getSize());
                orderItemInfoDto.setColor(orderItem.getColor());

                Optional<Item> optionalItem = itemRepository.findByOrderItems(orderItem);
                if (optionalItem.isPresent()) {
                    orderItemInfoDto.setItemName(optionalItem.get().getItemName());
                    orderItemInfoDto.setPrice(optionalItem.get().getPrice());
                    orderItemInfoDto.setPid(optionalItem.get().getId());
                }

                orderItemInfoDtos.add(orderItemInfoDto);
            }
            orderInfoDto.setOrderiteminfo(orderItemInfoDtos);
        }
        return orderInfoDto;
    }
}
