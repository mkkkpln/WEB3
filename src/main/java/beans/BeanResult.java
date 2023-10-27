package beans;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class BeanResult implements Serializable {
        List<PointBean> table;

    public BeanResult() {
        table = new ArrayList<>();
    }

    public BeanResult(List<PointBean> tableRows) {
        this.table = tableRows;
    }

    public List<PointBean> getResults() {
        return table;
    }

    public void setResults(List<PointBean> bean) {
        this.table = bean;
    }

    public void addRow(PointBean bean) {
        table.add(bean);
    }
}
