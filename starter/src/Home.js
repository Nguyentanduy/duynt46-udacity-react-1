import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from './Card'
import { get, getAll, update } from './BooksAPI'

export default function Home() {
    const [dataAll, setDataAll] = useState()
    const navigate = useNavigate()

    const getAllData = () => {
        getAll().then(data => {
            setDataAll(data)
        })
    }
    
    useEffect(() => {
        getAllData()
    }, [])

    const handleChangeBook = (book, shelf) => {
        update(book, shelf).then(() => getAllData())
    }

    return (
        <div>
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {dataAll?.map((item) => {
                                        if (item.shelf === "currentlyReading") {
                                            return <Card key={item.id} item={item} changeBook={handleChangeBook} />
                                        }
                                    })}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {dataAll?.map((item) => {
                                        if (item.shelf === "wantToRead") {
                                            return <Card key={item.id} item={item} changeBook={handleChangeBook} />
                                        }
                                    })}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {dataAll?.map((item) => {
                                        if (item.shelf === "read") {
                                            return <Card key={item.id} item={item} changeBook={handleChangeBook} />
                                        }
                                    })}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <a onClick={() => navigate("/search")}>Add a book</a>
                </div>
            </div>
        </div>
    )
}
