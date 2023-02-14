function MyList (props) {

    const listItems = props.items.map((item) => <li onClick={() => props.updateItem(item.id)} 
    style={item.clicked ? {textDecoration: 'line-through'} : {textDecoration: ''}} 
    key={item.id}>{item.text}</li>);

    return(
        <div>
            <h1>{props.header}</h1>
            <ol>
                {listItems}
            </ol>
        </div>
    )
}

export default MyList;