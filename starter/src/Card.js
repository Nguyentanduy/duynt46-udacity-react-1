import React from 'react'

export default function Card({ item, changeBook }) {
    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <img
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                        }}
                        src={item?.imageLinks?.thumbnail}
                    ></img>
                    <div className="book-shelf-changer">
                        <select onInput={(e) => changeBook(item, e.target.value)} value={item?.shelf || "none"}>
                            <option disabled>
                                {item.shelf ? "Move to..." : "Add to..."}
                            </option>
                            <option value="currentlyReading">
                                Currently Reading
                            </option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{item?.title}</div>
                <div className="book-authors">{item?.authors?.join(', ')}</div>
            </div>
        </li>
    )
}
