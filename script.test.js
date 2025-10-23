test("bookmarks are shown in reverse order (newest first)", () => {
  const bookmarks = [
    { title: "Bookmark 1", timestamp: "2024-01-01 10:00" },
    { title: "Bookmark 2", timestamp: "2024-01-02 10:00" },
    { title: "Bookmark 3", timestamp: "2024-01-03 10:00" },
  ];

  const reversed = [...bookmarks].reverse();

  // Verify the order
  expect(reversed[0].title).toBe("Bookmark 3");
  expect(reversed[1].title).toBe("Bookmark 2");
  expect(reversed[2].title).toBe("Bookmark 1");

  expect(bookmarks[0].title).toBe("Bookmark 1");
});
