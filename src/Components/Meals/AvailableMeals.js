import { useEffect ,useState} from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';


const AvailableMeals = () =>{

  const [isLoading,setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mealData,setMealData] = useState([]);

   const fetchMoviesHandler =  async () =>{
     setIsLoading(true);
     setError(null);
    try{
       const response = await fetch( 'https://react-http-1c3ee-default-rtdb.firebaseio.com/meals.json');
       const data = await response.json();
       console.log(data)
       const mealsData  =  data['-N499rBUqOdBYeriXWg0'];
       setMealData(mealsData);
       setIsLoading(false);
       console.log(mealsData);
    } catch(err){
      setIsLoading(false)
      setError(err.message)
    }
       
     

    setIsLoading(false)
  };
    useEffect(() => {
      fetchMoviesHandler();
    },[])
    const meals = mealData.map((meal) =>  
    <MealItem 
    key={meal.id}
    id={meal.id}
    mealName={meal.name} 
    mealPrice={meal.price}
    mealDes={meal.description}/>)

  let content = <ul>{meals}</ul>
  if(error){
    content = <p>{error}</p>
  }
  if(isLoading){
    content = <p>Loading...</p>
  }

    return(
      <Card className={classes.meals}>
            {content}
      </Card>  
    )
}

export default AvailableMeals;