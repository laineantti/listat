import React, { useState } from "react"
//import './App.css';

function App() {
	const [list1, setList1] = useState(["asd", "das"])
	const [list2, setList2] = useState(["hgf", "fgh"])
	const [selectedId, setSelectedId] = useState("")
	const [selectedList, setSelectedList] = useState("")
	const [moveThisItem, setMoveThisItem] = useState("")

	const moveItem = () => {
    if(selectedList === "1") {
      
    } else {

    }
  }

	const printList = (list, listId) => {
		return (
			<div style={{ float: "left" }}>
				<ul>
					{list.map((item, id) => (
						<li>
							<button
								id={id}
								onClick={(event) => {
									setSelectedId(event.target.id)
									setSelectedList(listId)
								}}
							>
								id: {id}, item: {item}
							</button>
						</li>
					))}
				</ul>
			</div>
		)
	}

	return (
		<div>
			<h4>
				selectedId: {selectedId}, selectedList: {selectedList}
			</h4>
			{printList(list1, "1")}
			<div style={{ float: "left" }}>
				<button
					onClick={() => {
						moveItem()
					}}
				>
					oikealle
				</button><br/>
				<button>vasemmalle</button>
			</div>
			{printList(list2, "2")}
		</div>
	)
}

export default App
