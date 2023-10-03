import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import jwt from '../service/jwt';
import { useNavigate } from 'react-router-dom';
import { randomId, } from '@mieuteacher/meomeojs';

export default function Admin() {
    const navigate = useNavigate();
    const userStore = useSelector(store => store.userStore);
    const productStore = useSelector(store => store.productStore);
    function formatCash(str) {
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + '.')) + prev
        }) + " VNĐ"
    }
    useEffect(() => {
        if (localStorage.getItem("token")) {
            const user = jwt.verifyToken(localStorage.getItem("token"), import.meta.env.VITE_PRIVATE_KEY)
            if (user.isAdmin != true) {
                alert("You don't have access")
                navigate('/');
            }
        }
        else {
            alert("You don't have access")
            navigate('/');
        }
    }, [])
    return (
        <div id='main'>
            <div className='admin'>
                <div className='products'>
                    <h2>Manage Products</h2>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Size</th>
                                <th>Price</th>
                                <th>Tools</th>
                                <th>Availability</th>
                            </tr>
                        </thead>


                        <tbody>
                            {
                                productStore.data.map(product => (
                                    <tr key={randomId()}>
                                        <td>
                                            {product.images != null ?
                                                <img src={product.images} alt="" />
                                                : <></>
                                            }
                                            <span>{product.productName}</span>
                                        </td>
                                        <td>
                                            {product.category}
                                        </td>
                                        <td>
                                            {product.size.map(sizeProduct => (<>{sizeProduct + " "}</>))}
                                        </td>
                                        <td>
                                            {formatCash(String(product.price))}
                                        </td>
                                        <td> <button>Delete</button> </td>
                                        <td>
                                            {
                                                product.status == false ? 
                                                <label className="switch">
                                                    <input type="checkbox" onChange={()=>{
                                                        return !product.status
                                                    }}/>
                                                    <span className="slider round" />
                                                </label>
                                                    : 
                                                    <label className="switch">
                                                        <input type="checkbox" defaultChecked="checked" onChange={()=>{
                                                        return !product.status
                                                    }}/>
                                                        <span className="slider round" />
                                                    </label>

                                            }


                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className='users'>
                    <h2>Manage Users</h2>
                </div>
            </div>

        </div>
    )
}
