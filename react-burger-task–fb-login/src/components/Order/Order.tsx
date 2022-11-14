import './Order.css';

const order = (props: any) => {
  const ingredients: {name: string, amount: number}[] = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }

  const IngredientOutput = ingredients.map(ig => {
    return (
      <span
        key={ig.name}
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 7px ',
          border: '1px solid #ccc',
          padding: '5px'
        }}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div className='Order'>
      <p>Ingredients: {IngredientOutput}</p>

      <p>
        Price: <strong> USD {props.price.toFixed(2)} </strong>
      </p>
    </div>
  );
};

export default order;
