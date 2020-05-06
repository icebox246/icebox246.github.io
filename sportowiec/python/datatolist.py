outfile = open("./out", "w")

with open("./in", "r") as inputf:
    for line in inputf.readlines():
        elems = line.split(" - ")
        outfile.write(
            f"<li><p><b>{elems[0]}</b> - {elems[1]} - <b>{elems[2]}</b></p></li>"
        )

outfile.close()
