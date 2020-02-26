import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { getBookQuery } from '../queries/queries'

const BookDetail = ({ bookId }) => {
	const { data, loading } = useQuery(getBookQuery, {
		variables: {
			id: bookId
		}
	})
	console.log(data)

	const displayBookDetail = () => {
		if (loading) {
			return <div>Loading book detail...</div>
		} else if (data.book) {
			return (
				<div>
					<h2>{data.book.name}</h2>
					<p>{data.book.genre}</p>
					<p>{data.book.author.name}</p>
					<p>All books of this author:</p>
					<ul className='other-books'>
						{data.book.author.books.map(book => {
							return <li key={book.id}>{book.name}</li>
						})}
					</ul>
				</div>
			)
		} else return <p>No book selected</p>
	}

	return (
		<div id='book-detail'>
			<p>Output book details here</p>
			{displayBookDetail()}
		</div>
	)
}

export default BookDetail
