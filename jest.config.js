<<<<<<< HEAD
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
});

module.exports = createJestConfig({
  moduleFileExtensions: [ "js", "jsx", ],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  clearMocks: true,
});
=======
process.env['NEXT_PUBLIC_SUPABASE_URL'] = 'https://mkmrcbhppygtzlpeqjar.supabase.co';

process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'] =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rbXJjYmhwcHlndHpscGVxamFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzYxMzczOTAsImV4cCI6MTk5MTcxMzM5MH0.Xgf9qF2OtKWu2SiYxKyipx-3a6ISVaXZn4CSGWR9CYA';

export default { transform: {} };
>>>>>>> 48709a1 (chore:jest config)
