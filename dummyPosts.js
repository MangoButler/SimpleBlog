const dummyPosts =  [
    {
      title: "The Journey of a Lifetime",
      image: "journey.jpg",
      excerpt: "Embark on an adventurous journey to explore the world's hidden gems.",
      date: "2023-08-01",
      slug: "the-journey-of-a-lifetime",
      content: `
        # The Journey of a Lifetime
  
        Are you ready for the adventure of a lifetime? Join us as we traverse through breathtaking landscapes,
        encounter fascinating cultures, and discover hidden treasures beyond imagination.
  
        Whether you're an intrepid explorer or a curious wanderer, this journey will leave an indelible mark on your soul.
  
        Don't miss out on the chance to create unforgettable memories. Let's start this epic journey together!
      `
    },
    {
      title: "Discovering the Enchanted Forest",
      image: "forest.jpg",
      excerpt: "Step into a magical forest full of mystical creatures and breathtaking scenery.",
      date: "2023-08-02",
      slug: "discovering-the-enchanted-forest",
      content: `
        # Discovering the Enchanted Forest
  
        Welcome to the Enchanted Forest, where dreams come to life and enchantment fills the air.
        Journey through ancient trees and encounter mythical creatures that will captivate your imagination.
  
        Lose yourself in the beauty of this magical realm as you uncover its mysteries and secrets.
  
        Are you ready to embrace the wonders of the Enchanted Forest? Let the adventure begin!
      `
    },
    {
      title: "Unraveling Ancient Mysteries",
      image: "mystery.jpg",
      excerpt: "Uncover the secrets of long-lost civilizations and decipher ancient scripts.",
      date: "2023-08-03",
      slug: "unraveling-ancient-mysteries",
      content: `
        # Unraveling Ancient Mysteries
  
        Delve into the past and embark on a journey of historical discovery. Unravel the enigmas of
        long-lost civilizations and decode ancient scripts that have baffled historians for centuries.
  
        From ancient tombs to hidden artifacts, every step will bring you closer to unraveling the
        secrets of our ancestors.
  
        Get ready to unlock the doors to history's most intriguing mysteries. Let the adventure begin!
      `
    }
  ];

export function getAllposts(){
    return dummyPosts;
}

export function getPostBySlug(postSlug){
    return dummyPosts.find(post => post.slug === postSlug);
}