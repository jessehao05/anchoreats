import React from 'react'

const SelectedHall = ({selected}) => {
  return (
    <div className="selected mb-10 pt-12 text-center px-12">
        <div className="name font-bold">{selected.name}</div>
        <div className="times">
            <div className="mt-2">
                <p className="text-gray-400">Monday</p>
                {selected.hours.M.map(time => {
                return <div>{time}</div>;
                })}
            </div>
            <div className="mt-2">
                <p className="text-gray-400">Tuesday</p>
                {selected.hours.T.map(time => {
                return <div>{time}</div>;
                })}
            </div>
            <div className="mt-2">
                <p className="text-gray-400">Wednesday</p>
                {selected.hours.W.map(time => {
                return <div>{time}</div>;
                })}
            </div>
            <div className="mt-2">
                <p className="text-gray-400">Thursday</p>
                {selected.hours.Th.map(time => {
                return <div>{time}</div>;
                })}
            </div>
            <div className="mt-2">
                <p className="text-gray-400">Friday</p>
                {selected.hours.F.map(time => {
                return <div>{time}</div>;
                })}
            </div>
            <div className="mt-2">
                <p className="text-gray-400">Saturday</p>
                {selected.hours.Sat.map(time => {
                return <div>{time}</div>;
                })}
            </div>
            <div className="mt-2">
                <p className="text-gray-400">Sunday</p>
                {selected.hours.Sun.map(time => {
                return <div>{time}</div>;
                })}
            </div>
        </div>
    </div>
  )
}

export default SelectedHall