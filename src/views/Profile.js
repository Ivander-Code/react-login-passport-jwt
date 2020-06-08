/** Dependencies */
import React from 'react';
import { useSelector } from 'react-redux';

/** Component */
export default function Profile() {
  const userDetail = useSelector(state => state.session.userDetail);
  return (
    <div className='text-center'>
      <h3 className='text-muted mb-3'>WELCOME</h3>
      <div className='text-dark'> {userDetail.username ?? ''}</div>
    </div>
  );
}
