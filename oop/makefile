CC      = g++
CFLAGS  = -g -std=c++11
RM      = rm -rf

SRC=$(wildcard *.cpp)
EXE=$(SRC:.cpp=)
dSYM=$(SRC:.cpp=.dSYM)

default: all

all: $(EXE)

%: %.cpp
	$(CC) $(CFLAGS) -o $@ $^

clean:
	$(RM) $(EXE) $(dSYM)