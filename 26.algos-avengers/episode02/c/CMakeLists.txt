cmake_minimum_required(VERSION 4.0)
project(tesseractEnergy C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

include_directories(.)

# main program
add_executable(tesseractEnergy
        tesseractEnergy.c
        tesseractEnergy.h
        main.c)

# unit tests
add_executable(tesseractEnergy_tests
        test_tesseractEnergy.c
        tesseractEnergy.c
        tesseractEnergy.h
)
