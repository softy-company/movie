import React from 'react';

const Error = () => 
{
  if (loading) {
		return (
			<div className='loading'>
				<h2>
					<ImSpinner3 />
				</h2>
				<h4>Loading...</h4>
			</div>
		)
	}
  return (
    <div>
      
    </div>
  );
};

export default Error;