// MongoDB Collection Summary Script
use eduflow

print("\n╔═══════════════════════════════════════════╗");
print("║   EDUFLOW DATABASE - COLLECTION SUMMARY   ║");
print("╚═══════════════════════════════════════════╝\n");

const collections = [
    'users',
    'courses',
    'assignments',
    'enrollments',
    'submissions',
    'grades',
    'quizzes',
    'quizattempts',
    'messages',
    'notifications'
];

print("Collection Name            | Document Count");
print("─────────────────────────-─┼────────────────");

collections.forEach(col => {
    const count = db[col].countDocuments();
    const padding = ' '.repeat(27 - col.length);
    print(col + padding + "│ " + count);
});

print("\n📊 Total Collections: " + db.getCollectionNames().length);
print("💾 Database Name: eduflow\n");
