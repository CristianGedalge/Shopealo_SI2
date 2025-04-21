import React from 'react'
import { OrdenHistoryItem } from './OrdenHistoryItem'

export const OrdenHistoryContainer = () => {
  return (
    <>
<div className="flex flex-col h-[300px] overflow-auto">
  <div className="w-full">
    <div className="bg-white rounded-lg shadow">
      <div className="bg-[#6050DC] text-white px-4 py-3 rounded-t-lg">
        <h5 className="text-lg font-semibold">Order History</h5>
      </div>

      <OrdenHistoryItem />
      <OrdenHistoryItem />
      <OrdenHistoryItem />
      <OrdenHistoryItem />
    </div>
  </div>
</div>

    </>
  )
}
