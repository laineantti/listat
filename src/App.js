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
	const [selected, setSelected] = useState(["", 0, ""]) // itemId, listId, word
	const [selectedText, setSelectedText] = useState()
	const [isSelected, setIsSelected] = useState(``)

	const printList = (list, listId) => {
		return (
			<div style={{ float: "left" }}>
				<b>Lista{listId}</b>
				<ul>
					{list.map((item) => {
						if (selected[0] === item.id)
							return (
								<li key={item.id}>
									<button
										id={item.id}
										value={item.word}
										onClick={(event) => {
											setSelected([event.target.id, listId, event.target.value])
										}}
									>
										{item.word} ✔️
									</button>
								</li>
							)
						else
							return (
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
							)
					})}
				</ul>
			</div>
		)
	}

	const editLists = (direction) => {
		// lista1 -> oikealle
		if (direction === 1 && selected[1] === 1) {
			let list1_only_item = list1.filter((item) => item.id === selected[0])
			let list1_without_item = list1.filter((item) => item.id !== selected[0])
			let list2_added_item = list2.concat(list1_only_item)
			setList1(list1_without_item)
			setList2(list2_added_item)
		}
		// lista1 -> vasemmalle
		if (direction === 0 && selected[1] === 1) {
		}
		// lista2 -> oikealle
		if (direction === 1 && selected[1] === 2) {
		}
		// lista2 -> vasemmalle
		if (direction === 0 && selected[1] === 2) {
			let list2_only_item = list2.filter((item) => item.id === selected[0])
			let list2_without_item = list2.filter((item) => item.id !== selected[0])
			let list1_added_item = list1.concat(list2_only_item)
			setList1(list1_added_item)
			setList2(list2_without_item)
		}
	}

	// valintatilanne
	useEffect(() => {
		if (selected[0] === "")
			setSelectedText(
				<ul>
					<li>word: -,</li>
					<li>itemId: -,</li>
					<li>listId: -</li>
				</ul>
			)
		else
			setSelectedText(
				<ul>
					<li>
						word: <b>{selected[2]}</b>
					</li>
					<li>
						itemId: <b>{selected[0]}</b>
					</li>
					<li>
						listId: <b>{selected[1]}</b>
					</li>
				</ul>
			)
	}, [selected])

	return (
		<div style={{ padding: "10px" }}>
			{selectedText}
			<br />
			<hr />
			{printList(list1, 1)}
			<div style={{ float: "left" }}>
				<ul>
					<li>
						<button
							onClick={() => {
								editLists(1)
							}}
						>
							➡️
						</button>
					</li>
					<li>
						<button
							onClick={() => {
								editLists(0)
							}}
						>
							⬅️
						</button>
					</li>
				</ul>
				<br />
			</div>
			{printList(list2, 2)}
		</div>
	)
}

export default App
