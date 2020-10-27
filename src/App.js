import React, { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

function App() {
	var randomWords = require("random-words")
	// 2 listaa joissa satunnaiset item (randomWords) ja id (uuidv4)
	const [list1, setList1] = useState(
		Array(10)
			.fill(null)
			.map(() => ({ id: uuidv4(), word: randomWords() }))
	)
	const [list2, setList2] = useState(
		Array(10)
			.fill(null)
			.map(() => ({ id: uuidv4(), word: randomWords() }))
	)
	const [selected, setSelected] = useState(0, "")
	const [selectedText, setSelectedText] = useState()

	const printList = (list, listId) => {
		return (
			<div style={{ float: "left" }}>
        <b>Lista{listId}</b>
				<ul>
					{list.map((item) => (
						<li>
							<button id={item.id} onClick={(event) => {setSelected([event.target.id, listId])}}>
								{item.word}
							</button>
						</li>
					))}
				</ul>
			</div>
		)
  }
  
  const editLists = () => {

  }

  // valintatilanne
	useEffect(() => {
		if (selected[0] === "") setSelectedText("Valitse jotain...")
		else setSelectedText(`Lista${selected[1]} (id ${selected[0]}) valittuna!`)
	}, [selected])

	return (
		<div>
      <b>{selectedText}</b>
				<br />
        <hr/>
			{printList(list1, 1)}
			<div style={{ float: "left" }}>
				<button onClick={() => {}}>oikealle</button>
				<br />
			</div>
			{printList(list2, 2)}
		</div>
	)
}

export default App
