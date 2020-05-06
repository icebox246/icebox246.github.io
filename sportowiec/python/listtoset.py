outfile = open("./out", "w")

list1 = []
list2 = []

with open("./in", "r") as inputf:
    for line in inputf.readlines():
        elems = line.split("\t")
        list1.append(elems[0])
        list2.append(elems[len(elems) - 1])

outfile.write("labels: [")

for li in list1:
    outfile.write(f'"{li}",')

outfile.write("]\n")

outfile.write("data: [")

for li in list2:
    outfile.write(f"{li.strip()},")

outfile.write("]\n")

outfile.close()
