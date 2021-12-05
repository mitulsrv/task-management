import React from 'react';
import FormComponent from './components/FormComponent';
import ListComponent from "./components/ListComponent";

function App() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
  }, [data]);  
  const onFormDataSaved = (object) => {
    if(object){
      let items = [...data, object];
      let updatedListData = items.sort((a, b) => {return (a.priority - b.priority)});
      setData(updatedListData);
    }
    return;
  }
  const onTaskStatusChange = (id) => {
    if(id){
      let itemIndex = data.findIndex(x => x.id === id);
      if(itemIndex > -1){
        let items = [...data];
        let item = {...data[itemIndex]};
        item.status = !item.status;
        items[itemIndex] = item;
        setData(items);
      }
    }
  }
  
  return (
      <>
      
      <FormComponent onSubmitForm={onFormDataSaved} ticketData={data}></FormComponent>
      <ListComponent listData={data} onStatusChange={onTaskStatusChange}></ListComponent>
      </>
  );
}

export default App;
