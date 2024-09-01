'use client'
import {supabase} from '@/supabase'
import PageTable from '@/components/table'
import { useEffect, useState } from 'react'
import { updateTextData } from '@/index'
export default function Page(){
  const formattedData = [
    {
      "age": 1,
      "status": "coplcated",
      "visits": 693,
      "lastName": "Ortiz",
      "progress": 3,
      "firstName": "Toby"
    },
    {
      "age": 33,
      "status": "relationship",
      "visits": 410,
      "lastName": "Shanahan",
      "progress": 60,
      "firstName": "Winfield"
    },
    {
      "age": 37,
      "status": "singe",
      "visits": 758,
      "lastName": "Smith",
      "progress": 37,
      "firstName": "Kacey"
    },
    {
      "age": 37,
      "status": "complicated",
      "visits": 265,
      "lastName": "Gorczany",
      "progress": 39,
      "firstName": "Kayleigh"
    },
    {
      "age": 8,
      "status": "single",
      "visits": 494,
      "lastName": "Pouros",
      "progress": 37,
      "firstName": "Phyllis"
    },
    {
      "age": 33,
      "status": "relationship",
      "visits": 644,
      "lastName": "Kiehn",
      "progress": 88,
      "firstName": "Otis"
    },
    {
      "age": 37,
      "status": "complicated",
      "visits": 466,
      "lastName": "Mraz",
      "progress": 64,
      "firstName": "Holden"
    },
    {
      "age": 9,
      "status": "relationship",
      "visits": 509,
      "lastName": "Yost",
      "progress": 15,
      "firstName": "Keshawn"
    },
    {
      "age": 39,
      "status": "relationship",
      "visits": 104,
      "lastName": "Satterfield",
      "progress": 65,
      "firstName": "Rosamond"
    },
    {
      "age": 13,
      "status": "single",
      "visits": 614,
      "lastName": "Williamson",
      "progress": 29,
      "firstName": "NSUT"
    }
  ]
  useEffect(() => {
  //   const updateData = async () => {
  //   const { data: updatedData, error } = await supabase
  //         .from('Text')
  //         .update({ data: formattedData })
  //         .eq('id', '6e18a7ba-55d7-481f-adae-ebff97e0f60b');
  //   if (error) {
  //     console.error('Error updating data:', error);
  //     return;
  //   }
  //   console.log(updatedData);
  // }
  // updateData();
  updateTextData('6e18a7ba-55d7-481f-adae-ebff97e0f60b',formattedData)
  },[])
    return(
      <div>hi</div>
      // <PageTable ></PageTable>
    //  <pre>{JSON.stringify(texts)}</pre>
    )
  }