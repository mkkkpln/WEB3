package beans;

import org.primefaces.model.FilterMeta;
import org.primefaces.model.LazyDataModel;
import org.primefaces.model.SortMeta;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Inject;

import java.util.List;
import java.util.Map;

@SessionScoped
public class PointBeanDataModel extends LazyDataModel<PointBean> {
    @Inject
    private BeanCollection beans;

    @Override
    public int count(Map<String, FilterMeta> map) {
        return beans.getBeansCount();
    }

    @Override
    public List<PointBean> load(int first, int pageSize, Map<String, SortMeta> map, Map<String, FilterMeta> map1) {
        return beans.getBeanCollection(first, pageSize);
    }
}