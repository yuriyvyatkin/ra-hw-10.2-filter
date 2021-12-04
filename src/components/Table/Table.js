import './Table.css';
import TableRow from './TableRow/TableRow';
import { useSelector, useDispatch } from 'react-redux';
import { removeService, editService } from '../../actions/actionCreators';

export default function Table() {
  const services = useSelector(state => state.list);
  const search = useSelector(state => state.search);
  const dispatch = useDispatch();

  function handleDeleteClick(id) {
    return dispatch(removeService(id));
  }

  function handleEditClick(id) {
    const index = services.findIndex((service) => service.id === id);
    const { name, price } = services[index];

    return dispatch(editService(name, price, { state: true, index }));
  }

  let filteredServices;

  if (search.query !== '') {
    filteredServices = services.map((service) => {
      if (!service.name.startsWith(search.query)) {
        return null;
      }

      const { id, name, price } = service;

      return (
        <TableRow
          key={id}
          id={id}
          name={name}
          price={price}
          onDeleteClick={() => handleDeleteClick(id)}
          onEditClick={() => handleEditClick(id)}
        />
      );
    })

    if (!filteredServices.filter(Boolean).length) {
      filteredServices = <tr>
        <td colSpan="3">По вашему запросу ничего не найдено</td>
      </tr>;
    }
  }

  return (
    <table className="Table">
      <thead>
        <tr>
          <th>Услуга</th>
          <th>Стоимость (руб.)</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {filteredServices || services.map((service) => {
          const { id, name, price } = service;

          return (
            <TableRow
              key={id}
              id={id}
              name={name}
              price={price}
              onDeleteClick={() => handleDeleteClick(id)}
              onEditClick={() => handleEditClick(id)}
            />
          );
        })}
      </tbody>
    </table>
  );
}
