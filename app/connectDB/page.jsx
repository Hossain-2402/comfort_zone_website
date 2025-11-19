"use client"

import "./style.css";
import { db } from "./firebase_realtime_test.js";
import { ref, onValue, set, update, remove } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import {useState,useEffect} from "react";


const ConnectDB = ()=>{
	const [messages, setMessages] = useState([]);
	const [item, setItem] = useState(null);


	// READ (onValue to get all messages in order)
	useEffect(() => {
		const msgRef = ref(db, "messages");

		onValue(msgRef, (snapshot) => {
			if (snapshot.exists()) {
				// Equivalent to snapshot.docs.map(...)
				setMessages(
				  Object.entries(snapshot.val()).map(([id, value]) => ({
				    id,
				    ...value
				  }))
				);
			} else {
				setMessages([]);
			}
		});
	}, []);



	// CREATE
	const addMessage = () => {

		const id = uuidv4();
		const data = {
    second_image: "https://firebasestorage.googleapis.com/v0/b/cz-database.appspot.com/o/300621449_453574236785519_4954143351241705391_n.jpg?alt=media&token=b3cac971-7b59-457d-a247-2f55f3aee75a",
    product_price: "530/-",
    third_image: "https://firebasestorage.googleapis.com/v0/b/cz-database.appspot.com/o/300624853_453574193452190_6867663679878180583_n.jpg?alt=media&token=f1d91fb2-2520-4f14-a36c-13f55829d55f",
    first_image: "https://firebasestorage.googleapis.com/v0/b/cz-database.appspot.com/o/300958023_453574163452193_4774621687553006460_n.jpg?alt=media&token=83bb22c5-3d91-4456-bafd-588137a6d2b1",
    sizes: "S",
    leading_image: "https://firebasestorage.googleapis.com/v0/b/cz-database.appspot.com/o/300497478_453574080118868_1495609140830269386_n.jpg?alt=media&token=b90c64b4-4ced-4148-81f5-c330154261b1",
    forth_image: "https://firebasestorage.googleapis.com/v0/b/cz-database.appspot.com/o/301010644_453574026785540_4772316008091736974_n.jpg?alt=media&token=3c463221-d35e-4b84-8701-20298dd3812f",
    product_detail: "Code:- SL01 \nGSM - 180 approx.",
    productId: id,
    category: "T-shirts",
    product_name: "Cotton T-shirt for men ",
    quantity: 1
  };


		set(ref(db, "messages/" + id), data);
	};


	// UPDATE
	const updateMessage = (id, newText) => {
		const data = {
			leading_image: "https://firebasestorage.googleapis.com/v0/b/cz-database.appspot.com/o/319637343_3440174402788540_4356361542207011003_n.jpg?alt=media&token=ba04ad24-8086-4e7b-8679-cfc461c050a4",
			first_image: "https://firebasestorage.googleapis.com/v0/b/cz-database.appspot.com/o/319676443_1293798481405031_5727287384283136176_n.jpg?alt=media&token=a2e9bfe8-a439-43ed-a82e-763e24c4d13d",
			second_image: "https://firebasestorage.googleapis.com/v0/b/cz-database.appspot.com/o/319901646_1485032195311218_6478903262143309063_n.jpg?alt=media&token=0a907a74-d3d4-4f6c-8d10-878f52f0abe6",
			quantity: 1,
			forth_image: "https://firebasestorage.googleapis.com/v0/b/cz-database.appspot.com/o/319156738_558901649393545_5642164122364418647_n.jpg?alt=media&token=7e9eedc0-f56c-41fc-b779-3318cd233422",
			product_detail:
			"- Chain Pockets so you never lose your stuff.\n" +
			"- Fabric with NO BRUSH inside.\n" +
			"- Stretchable.\n" +
			"- Elastic waist.\n" +
			"- SIZE\n" +
			"S :- (LENGTH - 38) (WAIST - 28-30)\n" +
			"M :-(LENGTH - 39) (WAIST - 30-32)\n" +
			"L :- (LENGTH - 40) (WAIST - 32-34)\n" +
			"XL :- (LENGTH - 41) (WAIST - 34-36)\n" +
			"2XL:- (LENGTH - 42) (WAIST - 36-38)",
			sizes: "S",
			productId: id ,
			third_image:
			"https://firebasestorage.googleapis.com/v0/b/cz-database.appspot.com/o/319894145_557538636265433_5254539879537447215_n.jpg?alt=media&token=5451f5a9-5e76-4e8b-81f4-f90e3cfa1f41",
			product_name: newText,
			category: "Joggers",
			product_price: "850/-",
		};


		update(ref(db, "messages/" + id), data);
	};


	// DELETE
	const deleteMessage = (id) => {
		remove(ref(db, "messages/" + id));
		console.log("message deleted");
	};



	const getMessageById = (id) => {
		const itemRef = ref(db, "messages/" + id);

		onValue(
			itemRef,
			(snapshot) => {
			if (snapshot.exists()) {
				setItem(snapshot.val());
				console.log(snapshot.val());
			} else {
				setItem(null);
			}
			},
			{ onlyOnce: true }
		);
	};
		
	return(
	<>
	 <button className="button" onClick={()=>{ addMessage() }}>Add item to db</button> 
		
	      <div className="items">
		{messages.map((m,index) => (
			<div key={index} className={index % 2 === 0 ? "item_EVEN" : "item_ODD"} >
				<p>{m.product_name} : {index+1}</p>
				<div className="operation delete_button" onClick={()=>{ deleteMessage(m.productId); }}>Delete</div>	
				<div className="operation update_button" onClick={()=>{ getMessageById(m.productId); }}>Update</div>
			</div>
		))}
	      </div>


	<pre style={{ textAlign:"left" }}>{JSON.stringify(item,null, 5)} </pre>
	</>

	);	

}


export default ConnectDB;
