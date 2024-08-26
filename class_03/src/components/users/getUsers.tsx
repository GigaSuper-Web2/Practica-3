import React, { useState, useEffect } from "react";
import axios from 'axios';
import logo from "../../logo.svg";

const GetUsers = () => {
    const [data, setData] = useState<any[]>([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [editId, setEditId] = useState<string | null>(null);
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');

    const Obtener = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users/list');
            setData(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const convertir = () => {
        // Mantener el método convertir como está
    };

    useEffect(() => {
        Obtener();
    }, []);

    useEffect(() => {
        convertir();
    }, [data]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/users/add', {
                name: name,
                email: email
            });
            console.log("Usuario creado:", response.data);
            Obtener();
            setName('');
            setEmail('');
        } catch (error) {
            console.error("Error al crear usuario:", error);
        }
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editId) {
            try {
                const response = await axios.put(`http://localhost:5000/users/edit/${editId}`, {
                    name: editName,
                    email: editEmail
                });
                console.log("Usuario actualizado:", response.data);
                Obtener();
                setEditId(null);
                setEditName('');
                setEditEmail('');
            } catch (error) {
                console.error("Error al actualizar usuario:", error);
            }
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete(`http://localhost:5000/users/delete/${id}`);
            console.log("Usuario eliminado:", response.data);
            Obtener();
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    };

    return (
        <div>
            <h5>Consumiendo datos de un API-Rest</h5>
            <p>En este ejemplo se muestra cómo consumir y enviar datos a un API-Rest</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Agregar Usuario</button>
            </form>

            {editId && (
                <form onSubmit={handleEdit}>
                    <h5>Modificar Usuario</h5>
                    <div>
                        <label>Nombre:</label>
                        <input 
                            type="text" 
                            value={editName} 
                            onChange={(e) => setEditName(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input 
                            type="email" 
                            value={editEmail} 
                            onChange={(e) => setEditEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit">Actualizar Usuario</button>
                </form>
            )}

            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item) => (
                    <tr key={item._id}>
                        <td>{item._id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>
                            <button onClick={() => {
                                setEditId(item._id);
                                setEditName(item.name);
                                setEditEmail(item.email);
                            }}>Editar</button>
                            <button onClick={() => handleDelete(item._id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default GetUsers;
