import MyList from './MyList';
import { useState, useRef } from 'react';

function MyContainer() {
    const ref = useRef(null);
    const [items, setItems] = useState([
        {id: 1, text: "This is an items", clicked: false},
        {id: 2, text: "This is another item", clicked: false},
    ]);

    const updateItem = (id) => {
        const newItems = [...items];

        newItems.forEach((item) => {
            if(item.id === id){
                item.clicked = !item.clicked;
            }
        });
        console.log(newItems)
        return setItems(newItems);
    };

    return(
        <div>
            <MyList 
            updateItem={updateItem}
            header="Epic list of items in order"
            items={items}
            />
            <textarea ref={ref} placeholder='Add item to list'></textarea>
            <button onClick={() => setItems([...items, {id: items.length + 1, text: ref.current.value, clicked: false}])}>Add</button>
        </div>
    )
}


export default MyContainer;