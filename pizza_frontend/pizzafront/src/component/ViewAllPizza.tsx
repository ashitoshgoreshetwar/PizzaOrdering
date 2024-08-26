import React, { useEffect, useState } from 'react';
import { getPizzas, deletePizza, updatePizza } from '../api/pizzaApi';
import { Pizza } from '../interfaces/Pizza';

const ViewAllPizza: React.FC = () => {
    const [pizzas, setPizzas] = useState<Pizza[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editingPizza, setEditingPizza] = useState<Pizza | null>(null);
    const [newPizzaDetails, setNewPizzaDetails] = useState<Partial<Pizza>>({});

    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const data = await getPizzas();
                setPizzas(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPizzas();
    }, []);

    const handleDelete = async (pizzaId: number) => {
        try {
            await deletePizza(pizzaId);
            setPizzas(pizzas.filter(pizza => pizza.PizzaId !== pizzaId));
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleUpdateClick = (pizza: Pizza) => {
        setEditingPizza(pizza);
        setNewPizzaDetails({
            Name: pizza.Name,
            RegularSizePrice: pizza.RegularSizePrice,
            MediumSizePrice: pizza.MediumSizePrice,
            LargeSizePrice: pizza.LargeSizePrice,
            Type: pizza.Type
        });
    };

    const handleUpdate = async () => {
        if (!editingPizza) return;

        try {
            await updatePizza(editingPizza.PizzaId, newPizzaDetails as Pizza);
            setPizzas(pizzas.map(pizza =>
                pizza.PizzaId === editingPizza.PizzaId
                    ? { ...pizza, ...newPizzaDetails }
                    : pizza
            ));
            setEditingPizza(null);
            setNewPizzaDetails({});
        } catch (err: any) {
            setError(err.message || "Failed to update pizza.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mt-4 mb-5">
            <h4>Pizza List</h4>
            {pizzas.length < 1 ? (
                <p>No pizzas available.</p>
            ) : (
                <>
                    <table className="table table-striped table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th>Sr. No.</th>
                                <th>Pizza ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Regular Size Price</th>
                                <th>Medium Size Price</th>
                                <th>Large Size Price</th>
                                <th>Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pizzas.map((pizza, index) => (
                                <tr key={pizza.PizzaId}>
                                    <td>{index + 1}</td>
                                    <td>{pizza.PizzaId}</td>
                                    <td>{pizza.Name}</td>
                                    {/* <td>{pizza.Description}</td> */}
                                    <td>₹{pizza.RegularSizePrice}</td>
                                    <td>₹{pizza.MediumSizePrice}</td>
                                    <td>₹{pizza.LargeSizePrice}</td>
                                    <td>{pizza.Type}</td>
                                    <td>
                                        <button 
                                            className="btn btn-danger btn-sm me-2" 
                                            onClick={() => handleDelete(pizza.PizzaId)}
                                        >
                                            Delete
                                        </button>
                                        <button 
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleUpdateClick(pizza)}
                                        >
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {editingPizza && (
                        <div className="mt-4">
                            <h5>Update Pizza Details</h5>
                            <input
                                type="text"
                                value={newPizzaDetails.Name || ''}
                                onChange={(e) => setNewPizzaDetails(prev => ({ ...prev, Name: e.target.value }))}
                                className="form-control mb-2"
                                placeholder="Name"
                            />
                            <input
                                type="number"
                                value={newPizzaDetails.RegularSizePrice || ''}
                                onChange={(e) => setNewPizzaDetails(prev => ({ ...prev, RegularSizePrice: parseFloat(e.target.value) }))}
                                className="form-control mb-2"
                                placeholder="Regular Size Price"
                            />
                            <input
                                type="number"
                                value={newPizzaDetails.MediumSizePrice || ''}
                                onChange={(e) => setNewPizzaDetails(prev => ({ ...prev, MediumSizePrice: parseFloat(e.target.value) }))}
                                className="form-control mb-2"
                                placeholder="Medium Size Price"
                            />
                            <input
                                type="number"
                                value={newPizzaDetails.LargeSizePrice || ''}
                                onChange={(e) => setNewPizzaDetails(prev => ({ ...prev, LargeSizePrice: parseFloat(e.target.value) }))}
                                className="form-control mb-2"
                                placeholder="Large Size Price"
                            />
                            <input
                                type="text"
                                value={newPizzaDetails.Type || ''}
                                onChange={(e) => setNewPizzaDetails(prev => ({ ...prev, Type: e.target.value }))}
                                className="form-control mb-2"
                                placeholder="Type"
                            />
                            <button
                                className="btn btn-primary me-2"
                                onClick={handleUpdate}
                            >
                                Save Changes
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => setEditingPizza(null)}
                            >
                                Cancel
                            </button>

                            <br /><br /><br />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ViewAllPizza;
