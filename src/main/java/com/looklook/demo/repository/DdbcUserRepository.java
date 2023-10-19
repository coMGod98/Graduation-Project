//package com.looklook.demo.repository;
//
//import com.looklook.demo.domain.LookLookUser;
//import org.springframework.data.domain.Example;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.domain.Sort;
//import org.springframework.data.repository.query.FluentQuery;
//
//import java.util.List;
//import java.util.Optional;
//import java.util.function.Function;
//
//public class DdbcUserRepository implements UserRepository{
//    @Override
//    public Optional<LookLookUser> findByUserId(String userId) {
//        return Optional.empty();return Optional.empty();
//    }
//
//    @Override
//    public List<LookLookUser> findAll() {
//        return null;
//    }
//
//    @Override
//    public List<LookLookUser> findAll(Sort sort) {
//        return null;
//    }
//
//    @Override
//    public Page<LookLookUser> findAll(Pageable pageable) {
//        return null;
//    }
//
//    @Override
//    public List<LookLookUser> findAllById(Iterable<Long> longs) {
//        return null;
//    }
//
//    @Override
//    public long count() {
//        return 0;
//    }
//
//    @Override
//    public void deleteById(Long aLong) {
//
//    }
//
//    @Override
//    public void delete(LookLookUser entity) {
//
//    }
//
//    @Override
//    public void deleteAllById(Iterable<? extends Long> longs) {
//
//    }
//
//    @Override
//    public void deleteAll(Iterable<? extends LookLookUser> entities) {
//
//    }
//
//    @Override
//    public void deleteAll() {
//
//    }
//
//    @Override
//    public <S extends LookLookUser> S save(S entity) {
//        return null;
//    }
//
//    @Override
//    public <S extends LookLookUser> List<S> saveAll(Iterable<S> entities) {
//        return null;
//    }
//
//    @Override
//    public Optional<LookLookUser> findById(Long aLong) {
//        return Optional.empty();
//    }
//
//    @Override
//    public boolean existsById(Long aLong) {
//        return false;
//    }
//
//    @Override
//    public void flush() {
//
//    }
//
//    @Override
//    public <S extends LookLookUser> S saveAndFlush(S entity) {
//        return null;
//    }
//
//    @Override
//    public <S extends LookLookUser> List<S> saveAllAndFlush(Iterable<S> entities) {
//        return null;
//    }
//
//    @Override
//    public void deleteAllInBatch(Iterable<LookLookUser> entities) {
//
//    }
//
//    @Override
//    public void deleteAllByIdInBatch(Iterable<Long> longs) {
//
//    }
//
//    @Override
//    public void deleteAllInBatch() {
//
//    }
//
//    @Override
//    public LookLookUser getOne(Long aLong) {
//        return null;
//    }
//
//    @Override
//    public LookLookUser getById(Long aLong) {
//        return null;
//    }
//
//    @Override
//    public LookLookUser getReferenceById(Long aLong) {
//        return null;
//    }
//
//    @Override
//    public <S extends LookLookUser> Optional<S> findOne(Example<S> example) {
//        return Optional.empty();
//    }
//
//    @Override
//    public <S extends LookLookUser> List<S> findAll(Example<S> example) {
//        return null;
//    }
//
//    @Override
//    public <S extends LookLookUser> List<S> findAll(Example<S> example, Sort sort) {
//        return null;
//    }
//
//    @Override
//    public <S extends LookLookUser> Page<S> findAll(Example<S> example, Pageable pageable) {
//        return null;
//    }
//
//    @Override
//    public <S extends LookLookUser> long count(Example<S> example) {
//        return 0;
//    }
//
//    @Override
//    public <S extends LookLookUser> boolean exists(Example<S> example) {
//        return false;
//    }
//
//    @Override
//    public <S extends LookLookUser, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
//        return null;
//    }
//}
