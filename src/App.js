import React, { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

function App() {
  var arraySize = 10
	var randomWords = require("random-words")
	// 2 listaa joissa satunnaiset item (randomWords) ja id + uuid (uuidv4)
	const [list1, setList1] = useState(
		Array(arraySize)
			.fill(null)
			.map((i) => ({ id: i, uuid: uuidv4(), word: randomWords() }))
	)
	const [list2, setList2] = useState(
		Array(arraySize)
			.fill(null)
			.map((i) => ({ id: i, uuid: uuidv4(), word: randomWords() }))
	)
	list1.forEach((item, i) => (item.id = i + 1))
	list2.forEach((item, i) => (item.id = i + 1))

	// itemId, itemUuid, word, listId
	const [selected, setSelected] = useState([0, "", "", 0])
	const [selectedText, setSelectedText] = useState()

	const printList = (list, listId) => {
		const isListEmpty = list.length <= 0
		return (
			<div style={{ float: "left" }}>
				<b>list{listId}</b> (length: {list.length})
				{isListEmpty ? (
					<p>This list has no items</p>
				) : (
					<ul>
						{list.map((item) => {
							if (selected[1] === item.uuid)
								return (
									<li key={item.uuid}>
										<button
											id={item.id}
											uuid={item.uuid}
											value={item.word}
											onClick={(event) => {
												setSelected([item.id, item.uuid, item.word, listId])
												console.log(event.target.uuid)
											}}
										>
											{item.word} ✔️
										</button>
									</li>
								)
							else
								return (
									<li key={item.uuid}>
										<button
											id={item.id}
											uuid={item.uuid}
											value={item.word}
											onClick={(event) => {
												setSelected([item.id, item.uuid, item.word, listId])
												console.log(event.target.uuid)
											}}
										>
											{item.word}
										</button>
									</li>
								)
						})}
					</ul>
				)}
			</div>
		)
	}

	const swapItems = (list, id1, id2) => {
		;[list[id1], list[id2]] = [list[id2], list[id1]]
		return list
	}

	const editLists = (direction) => {
		// list1 -> oikealle
		if (direction === 1 && selected[3] === 1) {
			let list1_only_item = list1.filter((item) => item.uuid === selected[1])
			let list1_without_item = list1.filter((item) => item.uuid !== selected[1])
			let list2_added_item = list2.concat(list1_only_item)
			setList1(list1_without_item)
			setList2(list2_added_item)
		}
		// list1 <- vasemmalle
		if (direction === 0 && selected[3] === 1) {
			let list1_without_item = list1.filter((item) => item.uuid !== selected[1])
			setList1(list1_without_item)
		}
		// list2 -> oikealle
		if (direction === 1 && selected[3] === 2) {
			let list2_without_item = list2.filter((item) => item.uuid !== selected[1])
			setList2(list2_without_item)
		}
		// list2 <- vasemmalle
		if (direction === 0 && selected[3] === 2) {
			let list2_only_item = list2.filter((item) => item.uuid === selected[1])
			let list2_without_item = list2.filter((item) => item.uuid !== selected[1])
			let list1_added_item = list1.concat(list2_only_item)
			setList1(list1_added_item)
			setList2(list2_without_item)
		}
		// list1 ^ ylös
		if (direction === 2 && selected[3] === 1 && selected[0] > 1) {
			setList1(swapItems(list1, selected[0] - 1, selected[0] - 2))
		}
		// list1 v alas
		if (direction === 3 && selected[3] === 1 && selected[0] < list1.length) {
			setList1(swapItems(list1, selected[0], selected[0] - 1))
		}
		// list2 ^ ylös
		if (direction === 2 && selected[3] === 2 && selected[0] > 1) {
			setList2(swapItems(list2, selected[0] - 1, selected[0] - 2))
		}
		// list2 v alas
		if (direction === 3 && selected[3] === 2 && selected[0] < list2.length) {
			setList2(swapItems(list2, selected[0], selected[0] - 1))
		}
		setSelected([0, "", "", 0])
	}

	// valintatilanne
	useEffect(() => {
		if (selected[1] === "")
			setSelectedText(
				<pre>
					<ul style={{ whitespace: "pre-wrap", display: "inline-block" }}>
						<li>arraySize:  <b>{arraySize}</b>,</li>
						<li>word:       -,</li>
						<li>itemId:     -,</li>
						<li>itemUuid:   -,</li>
						<li>listId:     -</li>
					</ul>
				</pre>
			)
		else
			setSelectedText(
				<pre>
					<ul style={{ whitespace: "pre-wrap", display: "inline-block" }}>
						<li>arraySize:  <b>{arraySize}</b>,</li>
						<li>
							word:       <b>{selected[2]}</b>
						</li>
						<li>
							itemId:     <b>{selected[0]}</b>
						</li>
						<li>
							itemUuid:   <b>{selected[1]}</b>
						</li>
						<li>
							listId:     <b>{selected[3]}</b>
						</li>
					</ul>
				</pre>
			)
	}, [selected, arraySize])

	return (
		<div style={{ padding: "10px" }}>
			<h2>Yksinkertaisten listojen käsittely</h2>
			<br />
			<hr />
			{selectedText}
			<br />
			<hr />
			{printList(list1, 1)}
			<div style={{ float: "left" }}>
				<ul>
					<li>
						<button
							onClick={() => {
								editLists(2)
							}}
						>
							🡩
						</button>
					</li>
					<li>
						<button
							onClick={() => {
								editLists(1)
							}}
						>
							🡪
						</button>
					</li>
					<li>
						<button
							onClick={() => {
								editLists(0)
							}}
						>
							🡨
						</button>
					</li>
					<li>
						<button
							onClick={() => {
								editLists(3)
							}}
						>
							🡫
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
