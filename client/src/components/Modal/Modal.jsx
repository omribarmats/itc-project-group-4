import React from 'react'
import UiDialog from '../../ui/uiKit/componentsUi/UiDialog'
import SearchForm from './SearchForm'

export default function Modal() {

    const handleOnClose = () => {
console.log('close modal')
    }

  return (
    <UiDialog open='true' onClose={handleOnClose}>
        <SearchForm/>
    </UiDialog>
  )
}
