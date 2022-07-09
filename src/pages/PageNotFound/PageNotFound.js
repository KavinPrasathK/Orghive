import React from 'react'
import styles from "./PageNotFound.module.css"

function PageNotFound() {
  return (
    <div >
    <div className={`${styles.pnf}`}>Err404! PageNotFound</div>
    <h1 className={`${styles.foot}`}>This Page doesn't exist</h1>
    </div>
  )
}

export default PageNotFound