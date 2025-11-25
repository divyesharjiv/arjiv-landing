@echo off
REM --- Rename all image files in this folder to 1, 2, 3 ... ---

setlocal enabledelayedexpansion
set count=1

REM Supported extensions
for %%E in (jpg jpeg png gif bmp webp) do (
    for %%F in (*%%E) do (
        ren "%%F" "!count!.%%E"
        set /a count+=1
    )
)

echo ✅ Renamed all images in %cd% successfully!
pause
