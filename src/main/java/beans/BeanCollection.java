package beans;

import com.google.gson.Gson;
import controller.AreaResultChecker;
import jakarta.enterprise.context.SessionScoped;
import jakarta.persistence.EntityManager;
import jakarta.inject.Named;

import java.io.*;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Named("beansCollection")
@SessionScoped
public class BeanCollection implements Serializable {
    private static final int LATEST_BEAN_COLL_COUNT = 10;

    private final EntityManager entityManager = DBManager.getInstance().entityManager;

    public BeanCollection() {}

    public List<PointBean> getBeanCollection(int start, int count) {
        return entityManager.createQuery("select pointBean from PointBean pointBean", PointBean.class)
                .setFirstResult(start).setMaxResults(count).getResultList();
    }

    public List<PointBean> uploadPoints() {
        List<PointBean> beansCollection = DBManager.getInstance().getCollectionFromDataBase();
        return beansCollection;
    }

    public List<PointBean> getLatestBeanCollection() {
        int beansCount = getBeansCount();
        int firstResultIndex = Math.max(beansCount - LATEST_BEAN_COLL_COUNT, 0);
        return  entityManager.createQuery("select pointBean From PointBean pointBean", PointBean.class)
                .setFirstResult(firstResultIndex).setMaxResults(LATEST_BEAN_COLL_COUNT).getResultList();
    }


    public String collectToJson(Function<? super PointBean, Double> getter) {
        return new Gson().toJson(getLatestBeanCollection().stream().map(getter).collect(Collectors.toList()));
    }

    public String getX() {
        return collectToJson(PointBean::getX);
    }

    public String getY() {
        return collectToJson(PointBean::getY);
    }

    public String getR() {
        return collectToJson(PointBean::getR);
    }

    public String getHit() {
        return new Gson().toJson(getLatestBeanCollection().stream().map(PointBean::isResult).collect(Collectors.toList()));
    }

    public PointBean addBean(PointBean pointBean) {
        final long curr_time = System.currentTimeMillis();
        final long startTime = System.nanoTime();
        pointBean.setResult(AreaResultChecker.isPointInArea(pointBean));
        long endTime = System.nanoTime();
        double totalTime = (double)(endTime - startTime)/1000/1000;
        pointBean.setCreatedAt(curr_time);
        pointBean.setExecutionTime(totalTime);
        entityManager.merge(pointBean);
        entityManager.flush();
        System.out.println(pointBean);
        return pointBean;
    }

    public int getBeansCount() {
        return entityManager.createQuery("select count(*) from PointBean", Number.class).getSingleResult().intValue();
    }

    public void clearBeans() {
        entityManager.createQuery("delete from PointBean").executeUpdate();
    }



}