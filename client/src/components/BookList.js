import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { getBooksQuery } from '../queries/queries'
import BookDetail from './BookDetail'

const BookList = () => {
	const { data, loading } = useQuery(getBooksQuery)
	const [selected, setSelected] = useState(null)

	const displayBooks = () => {
		if (loading) {
			return <div>Loading books...</div>
		} else {
			return data.books.map(book => {
				return (
					<li
						key={book.id}
						onClick={e => {
							setSelected(book.id)
						}}
					>
						{book.name}
					</li>
				)
			})
		}
	}

	return (
		<div>
			<ul id='book-list'>{displayBooks()}</ul>
			<BookDetail bookId={selected} />
		</div>
	)
}

export default BookList
