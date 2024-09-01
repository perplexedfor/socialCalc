'use server'
// import { supabase } from '@/supabase/index.js';

// export async function syncUser(clerkUser) {
//   const { id, firstName, lastName, emailAddresses } = JSON.parse(clerkUser);
//   const email = emailAddresses[0].emailAddress;
//   const cleanId = id.substring(5);

//   // Check if the user already exists
//   const { data: existingUser, error: fetchError } = await supabase
//     .from('User')
//     .select('*')
//     .eq('id', cleanId)
//     .single();

//   if (fetchError && fetchError.code !== 'PGRST116') {
//     // If an error occurs and it's not because the record doesn't exist, throw it
//     throw fetchError;
//   }

//   if (existingUser) {
//     // Update the existing user
//     const { error: updateError } = await supabase
//       .from('User')
//       .update({
//         name: `${firstName} ${lastName}`,
//         email,
//       })
//       .eq('id', cleanId);

//     if (updateError) {
//       throw updateError;
//     }
//   } else {
//     // Create a new user
//     const { error: insertError } = await supabase
//       .from('User')
//       .insert([
//         {
//           id: cleanId,
//           name: `${firstName} ${lastName}`,
//           email,
//         },
//       ]);

//     if (insertError) {
//       throw insertError;
//     }
//   }
// }

// export async function createFile(user) {
//   console.log('User object:', user);
//   const { id } = JSON.parse(user);
//   const transformedId = id.substring(5);

//   // Check if the user exists
//   const { data: existingUser, error: fetchError } = await supabase
//     .from('User')
//     .select('*')
//     .eq('id', transformedId)
//     .single();

//   if (fetchError && fetchError.code !== 'PGRST116') {
//     // If an error occurs and it's not because the record doesn't exist, throw it
//     throw fetchError;
//   }

//   if (!existingUser) {
//     throw new Error(`User with ID ${transformedId} does not exist`);
//   }
//   const { data: file, error: insertError } = await supabase
//     .from('Text')
//     .insert([
//       {
//         authorId: transformedId,
//         data: [], // Assuming you want to start with an empty array
//       },
//     ])
//     .single();

//   if (insertError) {
//     throw insertError;
//   }

//   return file;
// }

const prisma = require("./db");
const { syst } =  require("@prisma/client/sql");


export async function syncUser(clerkUser) {
  const { id, firstName, lastName, emailAddresses } = JSON.parse(clerkUser);
  const email = emailAddresses[0].emailAddress;
  const cleanId = id.substring(5);

  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: { id: cleanId },
  });

  if (existingUser) {
    // If the user exists, do not perform the upsert
    console.log(`User with ID ${cleanId} already exists. No update performed.`);
    return;
  }

  // If the user does not exist, perform the upsert operation
  await prisma.user.upsert({
    where: { id: cleanId },
    update: {
      name: `${firstName} ${lastName}`,
      email,
    },
    create: {
      id: cleanId,
      name: `${firstName} ${lastName}`,
      email,
    },
  });

  console.log(`User with ID ${cleanId} has been created or updated.`);
}

export async function createFile(user){
  // console.log('User object:', user);
  

  // const { id } = JSON.parse(user);
  // console.log('Original ID:', id);
  

  const transformedId = user.substring(5);
  console.log('Transformed ID:', transformedId);
  
  const existingUser = await prisma.user.findUnique({
    where: { id: transformedId },
  });
  
  if (!existingUser) {
    throw new Error(`User with ID ${transformedId} does not exist`);
  }

  const file = await prisma.Text.create({
    data: {
      authorId: user.substring(5),
      data: []
    },
  });
  return file
}
export async function updateTextData(id, newData) {
  try {
    const updatedText = await prisma.text.update({
      where: { id: id },
      data: { data: newData },
    });

    console.log('Update successful:', updatedText);
    return updatedText;
  } catch (error) {
    console.error('Error updating text data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}