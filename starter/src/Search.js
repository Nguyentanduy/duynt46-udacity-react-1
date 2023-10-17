import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAll, search, update } from './BooksAPI'
import Card from './Card'

export default function Search() {
    const navigate = useNavigate()
    const [dataBook, setDataBook] = useState()
    const [dataAll, setDataAll] = useState()

    const handleSearch = (dataSearch) => {
        search(dataSearch).then(data => {
            let arr = []
            if (data.length > 0) {
                data.map(itemSearch => {
                    let book = dataAll.find(a => a.id === itemSearch.id)
                    if (book) {
                        arr.push(book)
                    } else {
                        arr.push(itemSearch)
                    }
                })
                setDataBook(arr)
            }

        })
    }

    useEffect(() => {
        getAll().then(data => {
            setDataAll(data)
        })
    }, [])

    const handleChangeBook = (book, shelf) => {
        update(book, shelf)
    }

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <a
                    className="close-search"
                    onClick={() => navigate("/")}
                >
                    Close
                </a>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {dataBook?.map((item, index) => {
                        return <Card key={index} item={item} changeBook={handleChangeBook} />
                    })}
                </ol>
            </div>
        </div>
    )
}
