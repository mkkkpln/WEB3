package beans;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import jakarta.persistence.EntityManager;

import java.util.List;

public class DBManager {
    private static DBManager instance = null;
    public final EntityManager entityManager;

    private DBManager() {
        SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
        entityManager = sessionFactory.createEntityManager();
        entityManager.getTransaction().begin();
    }

    public static DBManager getInstance() {
        if(instance == null) {
            instance = new DBManager();
        }
        return instance;
    }

    public List<PointBean> getCollectionFromDataBase() {
        return entityManager.createQuery("SELECT pointBean FROM PointBean pointBean", PointBean.class).getResultList();
    }
}
