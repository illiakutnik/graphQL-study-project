import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { getBooksQuery } from '../queries/queries'

const BookList = () => {
	const { data, loading } = useQuery(getBooksQuery)

	const displayBooks = () => {
		if (loading) {
			return <div>Loading books...</div>
		} else {
			return data.books.map(book => {
				return <li key={book.id}>{book.name}</li>
			})
		}
	}

	return (
		<div>
			<ul id='book-list'>{displayBooks()}</ul>
		</div>
	)
}

export default BookList
