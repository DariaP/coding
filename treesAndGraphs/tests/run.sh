files=$(ls | grep -v 'run.sh')

for file in $files
do
  node $file
done