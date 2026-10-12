cmake_minimum_required(VERSION 4.0)
project(doomMainframe C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

include_directories(.)

# main program
add_executable(doomMainframe
        doomMainframe.c
        doomMainframe.h
        doomHash.c
        doomHash.h
        main.c)

# unit tests
add_executable(doomMainframe_tests
        test_doomMainframe.c
        doomMainframe.c
        doomMainframe.h
        doomHash.c
        doomHash.h
)
