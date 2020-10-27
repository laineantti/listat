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
	const [tempList, setTempList] = useState()
	const [selected, setSelected] = useState(["", 0]) // itemId, listId, word
	const [selectedText, setSelectedText] = useState()

	const printList = (list, listId) => {
		return (
			<div style={{ float: "left" }}>
				<b>Lista{listId}</b>
				<ul>
					{list.map((item) => (
						<li key={item.id}>
							<button
								id={item.id}
								value={item.word}
								onClick={(event) => {
									setSelected([event.target.id, listId, event.target.value])
								}}
							>
								{item.word}
							</button>
						</li>
					))}
				</ul>
			</div>
		)
	}

	const editLists = () => {
		if (selected[1] === 1) {
			setTempList(list1.filter((item) => item.id === selected[0]))
			setList1(list1.filter((item) => item.id === !selected[0]))
		}
	}

	// valintatilanne
	useEffect(() => {
		if (selected[0] === "") setSelectedText(
      <ul>
        <b>Valitse jotain...
        <li>============</li></b>
        <li>word: -,</li>
        <li>itemId: -,</li>
        <li>listId: -</li>
      </ul>
    )
		else
			setSelectedText(
				<ul>
					<b>Valittuna
					<li>============</li></b>
					<li>word: <b>{selected[2]}</b></li>
					<li>itemId: <b>{selected[0]}</b></li>
					<li>listId: <b>{selected[1]}</b></li>
				</ul>
			)
	}, [selected])

	return (
		<div>
			{selectedText}
			<br />
			<hr />
			{printList(list1, 1)}
			<div style={{ float: "left" }}>
				<button
					onClick={() => {
						editLists()
					}}
				>
					oikealle
				</button>
				<br />
			</div>
			{printList(list2, 2)}
		</div>
	)
}

export default App
