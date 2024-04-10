import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Item({ name, isPacked }) {
    if (isPacked) {
      return <li className="item">{name} ✔</li>;
    }
    return <li className="item">{name}</li>;
  }
  
  export default function Test() {
    return (
      <section>
        <h1>Sally Ride's Packing List</h1>
        <ul>
          <Item 
            isPacked={true} 
            name="Space suit" 
          />
          <Item 
            isPacked={true} 
            name="Helmet with a golden leaf" 
          />
          <Item 
            isPacked={false} 
            name="Photo of Tam" 
          />
        </ul>
      </section>
    );
  }