pnpm run build-admin
pnpm run export
cp -r admin-portal/build/static out/
mkdir out/admin
cp admin-portal/build/index.html out/admin/