// import React, { useState } from "react";
// // Style
// import Grid from "@mui/material/Grid";
// // Api
// import { fetchBooks } from "../../apis/books";
// // Component
// import { BookCard } from '../../components/Lists/BookCard'
// import { Search } from "../../components/Forms/Search";
// import { BookSearchButton } from "../../components/Buttons/BookSearchButton"

// export const BookSearch = () => {
//   const [keyword, setKeyword] = useState('')
//   const [books, setBooks] = useState([])
//   const dataSet = []
//   const handleSubmit = () => {
//     fetchBooks({
//       keyword: keyword,
//     }).then(data => {
//       setKeyword('')
//       data.books.map(book =>
//         dataSet.push(book.params)
//       );
//       setBooks(data.books)
//     })
//   }

//   return (
//     <Grid container sx={{ maxWidth: 1000, mx: "auto", bgcolor: 'grey.300' }}>
//       <Grid item sm={12} sx={{ px: 2, bgcolor: 'grey.200' }}>
//         <p>書籍名で検索</p>
//         <Search
//           keyword={keyword}
//           handleChange={e => setKeyword(e.target.value)}
//         />
//         <BookSearchButton
//           handleSubmit={handleSubmit}
//         />
//       </Grid>
//       <Grid item sm={12} sx={{ px: 2, bgcolor: 'grey.300' }}>
//         <h3>検索結果</h3>
//         <h4>書籍 : {books.length} 件</h4>
//       </Grid>
//       {
//         books.length && (
//           books.map(book =>
//             <Grid item key={book.params.isbn.toString()}
//               xs={6} sm={4} sx={{ p: 2, bgcolor: 'grey.100' }}>
//               <BookCard
//                 book={book.params}
//               />
//             </Grid>
//           )
//         )
//       }
//     </Grid>
//   )
// }
