import React, {useState} from "react"
import {v4 as uuidv4} from "uuid"

function App() {
    // lista koko ja sisältö
    var arraySize = 10, randomWords = require("random-words")
    
    // 2 listaa
    const [list1, setList1] = useState(Array(arraySize).fill(null)
    .map((i) => ({id: i, uuid: uuidv4(), word: randomWords()})))
    const [list2, setList2] = useState(Array(arraySize).fill(null)
    .map((i) => ({id: i, uuid: uuidv4(), word: randomWords()})))
    list1.forEach((item, i) => (item.id = i + 1))
    list2.forEach((item, i) => (item.id = i + 1))

    // itemId, itemUuid, word, listId
    const [selected, setSelected] = useState([""])

    const printList = (list, listId) => {
        return (
            <div style={{ float: "left" }}>
                <b>list{listId}</b>
                {(list.length <= 0) ? ( <p>This list has no items</p> ) : (
                    <ul>
                        {list.map((item) => {
                            return (
                                <li key={item.uuid}>
                                    <button id={item.id} uuid={item.uuid} value={item.word}
                                        onClick={(event) => {
                                            setSelected([item.id, item.uuid, item.word, listId])
                                        }}> {item.word} {(selected[1] === item.uuid)?("✔️"):("")}
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
        [list[id1], list[id2]] = [list[id2], list[id1]]
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
        setSelected([""])
    }

    return (
        <div style={{padding: "10px"}}>
            {printList(list1, 1)}
            <div style={{float: "left"}}><ul>
                <li><button onClick={() => {editLists(2)}}>🡩</button></li>
                <li><button onClick={() => {editLists(1)}}>🡪</button></li>
                <li><button onClick={() => {editLists(0)}}>🡨</button></li>
                <li><button onClick={() => {editLists(3)}}>🡫</button></li>
            </ul></div>
            {printList(list2, 2)}
        </div>
    )
}

export default App