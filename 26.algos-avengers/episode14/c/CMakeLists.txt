cmake_minimum_required(VERSION 4.0)
project(repairStack C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

include_directories(.)

# main program
add_executable(repairStack
        repairStack.c
        repairStack.h
        main.c)

# unit tests
add_executable(repairStack_tests
        test_repairStack.c
        repairStack.c
        repairStack.h
)
