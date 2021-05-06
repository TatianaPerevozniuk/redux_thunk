import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchTodos} from "./store";

function App() {
    const todos = useSelector(state => state.todos);
    const loading = useSelector(state => state.loading);
    const error = useSelector(state => state.error);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    return (
        <div className="App">
            <h1>Async Redux</h1>
            {loading && <div>Loading...</div>}
            {!loading && error && <div>Error occured</div>}
            {!loading && !error && (
                <ul>
                    {todos.map(todo => {
                            const {id, completed, title} = todo;
                            return (
                                <li key={id}>
                                    <input type='checkbox'
                                           checked={completed}
                                           readOnly={true}
                                           name={id}
                                           id={id}/>
                                    <label htmlFor={id}>{title}</label>
                                </li>
                            );
                        }
                    )}
                </ul>
            )}
        </div>
    );
}

export default App;
