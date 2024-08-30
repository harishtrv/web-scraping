
async function insertToDB(ownerDetails, client) {
  try {
    const query = `
      INSERT INTO landdetails."OWNERS_DETAILS" (
        owner_full_name, total_extent, surveyno, surnoc, hissa, village_name, liablities
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    
    // Execute the insert query with the provided owner details
    await client.query(query, [
      ownerDetails.owner_full_name,
      ownerDetails.total_extent,
      ownerDetails.surveyno,
      ownerDetails.surnoc,
      ownerDetails.hissa,
      ownerDetails.village_name,
      ownerDetails.liablities
    ]);

    console.log('Owner details inserted successfully!');
  } catch (err) {
    console.error('Error inserting owner details:', err);
  }
}

module.exports = insertToDB;
